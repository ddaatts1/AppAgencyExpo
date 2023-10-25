import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "./auth.dto";
import {SERVICE_FTL} from "../../constants/service";
import {useFutureLang} from "../../screens/context/StartUpProvider";

export const StorageHelper = {
    clearSession() {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
    },
    getToken: async () => {
        return AsyncStorage.getItem("token");
    },
    setToken: async (token: string) => {
        AsyncStorage.setItem("token", token);
    },
    setUser: async (user: UserDto) => {
        AsyncStorage.setItem("user", JSON.stringify(user));
    },
    getUser: async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                const parsedUser = JSON.parse(user);
                return parsedUser;
            } else {

                return null;
            }
        } catch (err) {
            return null;
        }
    },
    getCart: async () => {
        try {
            const cart = await AsyncStorage.getItem('cart');
            if (cart !== null) {
                const parsedCart = JSON.parse(cart);
                return parsedCart;
            } else {
                return [];
            }
        } catch (err) {
            return [];
        }
    },


    addToCart: async (item: any) => {
        try {


            const existingCart = await StorageHelper.getCart();
            // Check if an item with the same ID exists in the cart
            const existingItemIndex = existingCart.findIndex(
                (cartItem) => cartItem.item.id === item.item.id
            );

            if (existingItemIndex !== -1) {
                // If the item already exists, update its quantity
                existingCart[existingItemIndex].quantity += item.quantity;
            } else {
                // If it doesn't exist, add the item to the cart
                existingCart.push(item);
                console.log("item:"+ JSON.stringify(item))
                // update cart count
                if(item.service == SERVICE_FTL){
                    const existingCartCount = await StorageHelper.getCartCountFTL();
                    const updatedCartCount = existingCartCount + 1;
                    console.log("count ftl: "+ updatedCartCount)
                    await StorageHelper.updateCartCountFTL(updatedCartCount);
                }else {
                    const existingCartCount = await StorageHelper.getCartCountKIDS();
                    const updatedCartCount = existingCartCount + 1;
                    console.log("count fkid: "+ updatedCartCount)

                    await StorageHelper.updateCartCountKIDS(updatedCartCount);
                }


            }
            await AsyncStorage.setItem('cart', JSON.stringify(existingCart));
            return existingCart;
        } catch (err) {
            console.error('Error adding item to cart:', err);
            return null;
        }
    },
    removeFromCart: async (itemId: any) => {
        try {

            let service ;
            const existingCart = await StorageHelper.getCart();
            const updatedCart = existingCart.filter(
                (item) => {
                    if(item.item.id == itemId){
                        service = item.service
                        return false;

                    }
                    return true;
                }
            );
            if(service == SERVICE_FTL){
                const existingCartCount = await StorageHelper.getCartCountFTL();
                const updatedCartCount = existingCartCount - 1;

                await StorageHelper.updateCartCountFTL(updatedCartCount);
            }else {
                const existingCartCount = await StorageHelper.getCartCountKIDS();
                const updatedCartCount = existingCartCount - 1;

                await StorageHelper.updateCartCountKIDS(updatedCartCount);
            }

            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        } catch (err) {
            console.error('Error removing item from cart:', err);
            return null;
        }
    },
    removeFromCartByCategory: async (category, service) => {
        try {
            const existingCart = await StorageHelper.getCart();

            // Calculate the total quantity to be subtracted
            const itemsToRemove = existingCart.filter(
                (item) => item.category === category && item.service === service
            );
            const totalQuantityToRemove = itemsToRemove.reduce(
                (total, item) => total + item.quantity,
                0
            );

            // Update the cart count based on the service
            if (service === SERVICE_FTL) {
                const existingCartCount = await StorageHelper.getCartCountFTL();
                const updatedCartCount = Math.max(existingCartCount - totalQuantityToRemove, 0);
                await StorageHelper.updateCartCountFTL(updatedCartCount);
            } else {
                const existingCartCount = await StorageHelper.getCartCountKIDS();
                const updatedCartCount = Math.max(existingCartCount - totalQuantityToRemove, 0);
                await StorageHelper.updateCartCountKIDS(updatedCartCount);
            }

            // Remove items with the specified category and service
            const updatedCart = existingCart.filter(
                (item) => !(item.category === category && item.service === service)
            );

            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        } catch (err) {
            console.error('Error removing items from cart by category:', err);
            return null;
        }
    },
    getCartCountKIDS: async () => {
        try {
            // StorageHelper.updateCartCountKIDS(0)
            const count = await AsyncStorage.getItem('cartCountKIDS');
            console.log("cart kids: "+ count)
            return count ? parseInt(count, 10) : 0;
        } catch (err) {
            console.error('Error getting cart count:', err);
            return null;
        }
    },

    updateCartCountKIDS: async (count: number) => {
        try {
            await AsyncStorage.setItem('cartCountKIDS', count.toString());
        } catch (err) {
            console.error('Error updating cart count:', err);
        }
    },
    getCartCountFTL: async () => {
        try {
            // StorageHelper.updateCartCountFTL(0)
            const count = await AsyncStorage.getItem('cartCountFTL');
            console.log("cart ftl: "+ count)
            return count ? parseInt(count, 10) : 0;
        } catch (err) {
            console.error('Error getting cart count:', err);
            return null;
        }
    },

    updateCartCountFTL: async (count: number) => {
        try {
            await AsyncStorage.setItem('cartCountFTL', count.toString());
        } catch (err) {
            console.error('Error updating cart count:', err);
        }
    },

};
