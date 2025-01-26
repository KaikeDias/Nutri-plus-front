export default interface FoodDTO {
    name: string;
    quantity: string;
    unit: string;
    homeQuantity: string;
    homeUnit: string;
    substitutions: FoodDTO[];
}