interface PiSDK {
    init(config: { version: string; sandbox?: boolean }): void;
    authenticate(
        scopes: string[],
        onIncompletePaymentFound: (p: any) => void
    ): Promise<any>;
    createPayment(
        data: { amount: number; memo: string; metadata?: any },
        callbacks: {
            onReadyForServerApproval: (paymentId: string) => void;
            onReadyForServerCompletion: (paymentId: string, txid: string) => void;
            onCancel?: (reason: string) => void;
            onError?: (error: any) => void;
        }
    ): Promise<any>;
}

declare global {
    interface Window {
        Pi: PiSDK;
    }
}

export { };