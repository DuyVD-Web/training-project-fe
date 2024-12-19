export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type ErrorResponse = {
    status: boolean;
    message?: string;
    errors?: Record<string, string[]>;
    code?: number | string;
};

export type PaginationResponse = {
    status: boolean;
    data: {
        meta: {
            currentPage: number;
            lastPage: number;
            total: number;
            perPage: number;
            from: number;
            to: number;
            links: {
                first: string;
                last: string;
                prev: string | null;
                next: string | null;
            };
        };
        [key: string]: unknown; // For additional data properties
    };
};