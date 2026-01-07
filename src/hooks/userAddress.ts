import type { AddressData } from "@/datamodels/AddressData";

/* ======================================================
 * API Config
 * ====================================================== */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}

/* ======================================================
 * Backend Models
 * ====================================================== */
type UserAddressApiModel = {
    id: number;
    name: string;
    phone?: string;
    note?: string;
    fullAddress: string;
    addressType: "Domestic" | "International";
    isDefault: boolean;
};

type GetAddressesResponse = {
    success: boolean;
    data?: {
        addresses: UserAddressApiModel[];
    };
    message: string;
};

type AddressResponse = {
    success: boolean;
    data?: UserAddressApiModel;
    message: string;
};

/* ======================================================
 * Mapper
 * ====================================================== */
function mapApiToUi(api: UserAddressApiModel): AddressData {
    return {
        id: api.id,
        address: api.fullAddress,
        phone: api.phone,
        label: api.name,
        note: api.note,
        inUse: api.isDefault,
        addressType: api.addressType,
    };
}

/* ======================================================
 * Service (name preserved)
 * ====================================================== */
export function userAddress() {
    async function getAddresses(params: {
        supabaseAccessToken: string;
        mode?: "domestic" | "international";
    }): Promise<AddressData[]> {
        try {
            const addressType =
                params.mode === "domestic"
                    ? "Domestic"
                    : params.mode === "international"
                        ? "International"
                        : undefined;

            const url = new URL(`${BASE_URL}/customer/addresses`);

            if (addressType) {
                url.searchParams.set("addressType", addressType);
            }

            const res = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${params.supabaseAccessToken}`,
                    Accept: "*/*",
                },
            });

            const json: GetAddressesResponse = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(
                    json.message || "Failed to fetch addresses"
                );
            }

            return (json.data?.addresses ?? []).map(mapApiToUi);
        } catch (e) {
            console.error("[AddressService] getAddresses failed", e);
            throw e;
        }
    }

    async function createAddress(params: {
        supabaseAccessToken: string;
        payload: any;
    }): Promise<AddressData> {
        try {
            const res = await fetch(`${BASE_URL}/customer/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${params.supabaseAccessToken}`,
                },
                body: JSON.stringify(params.payload),
            });

            const json: AddressResponse = await res.json();

            if (!res.ok || !json.success || !json.data) {
                throw new Error(
                    json.message || "Failed to create address"
                );
            }

            return mapApiToUi(json.data);
        } catch (e) {
            console.error("[AddressService] createAddress failed", e);
            throw e;
        }
    }

    async function updateAddress(params: {
        supabaseAccessToken: string;
        addressId: number;
        payload: any;
    }): Promise<AddressData> {
        try {
            const res = await fetch(
                `${BASE_URL}/customer/addresses/${params.addressId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${params.supabaseAccessToken}`,
                    },
                    body: JSON.stringify(params.payload),
                }
            );

            const json: AddressResponse = await res.json();

            if (!res.ok || !json.success || !json.data) {
                throw new Error(
                    json.message || "Failed to update address"
                );
            }

            return mapApiToUi(json.data);
        } catch (e) {
            console.error("[AddressService] updateAddress failed", e);
            throw e;
        }
    }

    async function deleteAddress(params: {
        supabaseAccessToken: string;
        addressId: number;
    }): Promise<void> {
        try {
            const res = await fetch(
                `${BASE_URL}/customer/addresses/${params.addressId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${params.supabaseAccessToken}`,
                        Accept: "*/*",
                    },
                }
            );

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(
                    json.message || "Failed to delete address"
                );
            }
        } catch (e) {
            console.error("[AddressService] deleteAddress failed", e);
            throw e;
        }
    }

    return {
        getAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
    };
}
