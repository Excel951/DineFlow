import {ItemSchema} from "../utils/itemSchema.js";

export async function validateItemAction(prevState, formData) {
//     Simulasi create atau update item
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const rawData = Object.fromEntries(formData.entries());
        rawData.price = parseFloat(rawData.price);

        const result = ItemSchema.safeParse(rawData);

        if (!result.success) {
            const errorMessage = result.error.flatten().fieldErrors;
            console.log("Error Messages:", errorMessage);
            return {error: 'Cek kembali isian item!', success: false, errors: errorMessage, data: rawData};
        }

        const validatedData = result.data;
        validatedData.id = Number(rawData.id) || undefined;

        const isEdit = validatedData.id == undefined ? false : true;

        const itemData = {
            id: isEdit ? validatedData.id : Date.now(),
            name: validatedData.name,
            price: parseFloat(rawData.price),
            category: validatedData.category,
            image: validatedData.image,
        };

        return {
            success: true,
            isEdit,
            data: itemData,
            timestamps: Date.now(),
        };
    } catch (e) {
        return {error: "Terjadi kesalahan saat menyimpan data.", success: false};
    }
}
