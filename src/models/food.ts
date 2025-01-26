export default interface Food {
    id: string;
    name: string;
    quantity: string;
    unit: string;
    homeQuantity: string;
    homeUnit: string;
    substitutions: Food[];
}