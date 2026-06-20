export type BokunWidgetType = "booking" | "availability" | "checkout";

export interface BokunWidgetProps {
  productId: string;
  widgetType?: BokunWidgetType;
  locale: string;
  className?: string;
}

declare global {
  interface Window {
    BokunWidgetsLoader?: {
      load: (config: Record<string, unknown>) => void;
    };
  }
}

export {};

