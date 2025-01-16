export default interface Food {
    id: string;
    name: string;
    quantity: string;
    unit: string;
    substitutions: Food[];
}