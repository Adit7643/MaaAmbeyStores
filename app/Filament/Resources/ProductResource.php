<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\Pages\EditProduct;
use App\Filament\Resources\ProductResource\Pages\ProductImages;
use App\Filament\Resources\ProductResource\Pages\ProductVariations;
use App\Filament\Resources\ProductResource\Pages\ProductVariationTypes;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use App\ProductStatusEnum;
use App\RolesEnum;
use Dom\Text;
use Filament\Facades\Filament;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Pages\SubNavigationPosition;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-s-queue-list';
    protected static SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->forVendor();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
                Forms\Components\Grid::make()
                    ->schema([
                        TextInput::make('title')
                            ->live(onBlur: true)
                            ->required()
                            ->afterstateUpdated(
                                function (string $operation, $state, callable $set) {
                                    $set($operation, Str::slug($state));
                                }
                            ),
                        TextInput::make('slug')
                            ->required(),
                        Select::make('department_id')
                            ->relationship('department', 'name')
                            ->label(__('Department'))
                            ->preload()
                            ->searchable()
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function (callable $set) {
                                $set('category_id', null);
                            }),
                        Select::make('category_id')
                            ->relationship(
                                'category',
                                'name',
                                modifyQueryUsing: function (Builder $query, callable $get) {
                                    $departmentId = $get('department_id');
                                    if ($departmentId) {
                                        $query->where('department_id', $get('department_id'));
                                    }
                                }
                            )
                            ->label(__('Category'))
                            ->preload()
                            ->searchable()
                            ->required(),
                    ]),
                Forms\Components\RichEditor::make('description')
                    ->required()
                    ->toolbarButtons([
                        'bockquote',
                        'bold',
                        'bulletList',
                        'h2',
                        'h3',
                        'italic',
                        'link',
                        'orderedList',
                        'redo',
                        'strike',
                        'undo',
                        'table',
                    ])
                    ->columnSpan(2),
                TextInput::make('price')
                    ->required()
                    ->numeric(),
                TextInput::make('quantity')
                    ->integer(),
                Select::make('status')
                    ->options(ProductStatusEnum::labels())
                    ->default(ProductStatusEnum::Draft->value)
                    ->required()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
                SpatieMediaLibraryImageColumn::make('images')
                    ->collection('images')
                    ->limit(1)
                    ->conversion('thumb')
                    ->label('Image'),
                Tables\Columns\TextColumn::make('title')
                    ->sortable()
                    ->words(10)
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->colors(ProductStatusEnum::colors())
                    ->sortable()
                    ->searchable(),
                //department
                Tables\Columns\TextColumn::make('department.name')
                    ->sortable()
                    ->searchable(),
                //category
                Tables\Columns\TextColumn::make('category.name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
            'images' => Pages\ProductImages::route('/{record}/images'),
            'variation-type' => Pages\ProductVariationTypes::route('/{record}/variation-types'),
            'variations' => Pages\ProductVariations::route('/{record}/variations'),
        ];
    }
    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            EditProduct::class,
            ProductImages::class,
            ProductVariationTypes::class,
            ProductVariations::class,
        ]);
    }
    public static function canViewAny(): bool
    {
        $user = Filament::auth()->user();
        return $user && $user->hasRole(RolesEnum::Vendor);
    }
}
