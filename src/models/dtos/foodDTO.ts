export default interface FoodDTO {
    name: string;
    quantity: string;
    unit: string;
    substitutions: FoodDTO[];
}