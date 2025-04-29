<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use App\ProductVariationTypesEnum;
use Dom\Text;
use Filament\Actions;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class ProductVariationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $title = 'Variation Types';
    protected static ?string $navigationIcon = 'heroicon-m-numbered-list';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Repeater::make('variationTypes')
                ->label(false)
                    ->relationship()
                    ->collapsible()
                    ->defaultItems(1)
                    ->addActionLabel('Add new variation type')
                    ->columns(2)
                    ->columnSpan(2)
                    ->schema([
                        TextInput::make('name')
                            ->required(),
                        Select::make('type')
                            ->options(ProductVariationTypesEnum::labels())
                            ->required(),
                        Repeater::make('options')
                            ->relationship()
                            ->collapsible()
                            ->defaultItems(1)
                            ->addActionLabel('Add new option')
                            ->columns(2)
                            ->columnSpan(2)
                            ->schema([
                                TextInput::make('name')
                                    ->columnSpan(2)
                                    ->required(),
                                SpatieMediaLibraryFileUpload::make('image')
                                    ->collection('images')
                                    ->label(__('Image'))
                                    ->image()
                                    ->multiple()
                                    ->panelLayout('Grid')
                                    ->preserveFilenames()
                                    ->openable()
                                    ->reorderable()
                                    ->columnSpan(3),
                            ]),
                    ])
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
