export type BranchAddress = {
    lat: string;
    long: string;
};

export type Branch = {
    id: number;
    code: string;
    name: string;
    address: BranchAddress;
};
