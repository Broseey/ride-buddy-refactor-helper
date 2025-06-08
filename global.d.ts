
interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback: (response: any) => void;
  onClose: () => void;
}

interface PaystackPop {
  setup: (options: PaystackOptions) => {
    openIframe: () => void;
  };
}

declare global {
  interface Window {
    PaystackPop: PaystackPop;
  }
}

export {};
