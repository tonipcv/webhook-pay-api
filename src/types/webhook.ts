export interface WebhookContact {
  id: string;
  name: string;
  company_name: string;
  email: string;
  doc: string;
  phone_number: string;
  phone_local_code: string;
  address: string;
  address_number: string;
  address_comp: string;
  address_district: string;
  address_city: string;
  address_state: string;
  address_state_full_name: string;
  address_country: string;
  address_zip_code: string;
  lead: any[];
}

export interface WebhookProduct {
  id: string;
  image_url: string;
  internal_id: string;
  marketplace_id: string;
  marketplace_name: string;
  name: string;
  offer: {
    id: string;
    name: string;
  };
  producer: {
    marketplace_id: string;
    name: string;
    contact_email: string;
  };
  qty: number;
  total_value: number;
  type: string;
  unit_value: number;
}

export interface WebhookPayment {
  affiliate_value: number;
  acquirer: {
    code: string;
    message: string;
    name: string;
    nsu: string;
    tid: string;
  };
  can_try_again: number;
  coupon: any;
  currency: string;
  discount_value: number;
  gross: number;
  installments: {
    value: number;
    qty: number;
    interest: number;
  };
  marketplace_id: string;
  marketplace_name: string;
  marketplace_value: number;
  method: string;
  net: number;
  processing_times: {
    started_at: string;
    finished_at: string;
    delay_in_seconds: number;
  };
  refund_reason: string;
  refuse_reason: string;
  tax: {
    value: number;
    rate: number;
  };
  total: number;
  pix?: {
    qrcode: {
      signature: string;
      url: string;
    };
    expiration_date: string;
  };
}

export interface WebhookBody {
  affiliations: any;
  api_token: string;
  cancel_at_cycle_end: number;
  cancel_reason: string;
  cancelled_by: {
    name: string;
    email: string;
    date: string;
  };
  charged_every_days: number;
  charged_times: number;
  contracts: any[];
  current_invoice: {
    charge_at: string;
    code: string;
    created_at: number;
    cycle: number;
    discount_value: number;
    id: string;
    increment_value: number;
    payment_url: string;
    period_end: string;
    period_start: string;
    status: string;
    subscription_id: string;
    tax_value: number;
    type: string;
    value: number;
    updated_at: number;
  };
  dates: {
    canceled_at: string | null;
    cycle_end_date: string;
    cycle_start_date: string;
    last_status_at: string;
    next_cycle_at: string;
    started_at: string;
  };
  id: string;
  internal_id: string;
  last_status: string;
  last_transaction: {
    contact: WebhookContact;
    dates: {
      canceled_at: string | null;
      confirmed_at: string | null;
      created_at: string;
      expires_at: string;
      ordered_at: string;
      unavailable_until: string | null;
      updated_at: string;
      warranty_until: string | null;
    };
    ecommerces: any[];
    extras: {
      accepted_terms_url: number;
      accepted_privacy_policy_url: number;
    };
    id: string;
    infrastructure: {
      ip: string;
      city: string;
      host: string;
      ga_id: string;
      region: string;
      country: string;
      user_agent: string;
      city_lat_long: string;
      facebook_browser_id: string;
    };
    invoice: {
      charge_at: string;
      created_at: string;
      cycle: number;
      discount_value: number;
      id: string;
      increment_value: number;
      period_end: string;
      period_start: string;
      status: string;
      tax_value: number;
      tries: number;
      try: number;
      type: string;
      value: number;
    };
    payment: WebhookPayment;
    product: WebhookProduct;
    shipment: {
      carrier: string;
      service: string;
      tracking: string;
      value: number;
      status: string;
      delivery_time: string;
    };
    shipping: {
      name: string;
      value: number;
    };
    source: {
      source: any;
      checkout_source: any;
      utm_source: any;
      utm_campaign: any;
      utm_medium: any;
      utm_content: any;
      utm_term: any;
      pptc: any[];
    };
    status: string;
    type: string;
  };
  name: string;
  next_cycle_installments: number;
  next_cycle_value: number;
  next_product: {
    id: string;
    marketplace_id: string;
    marketplace_name: string;
    name: string;
    offer: {
      cash_discount: number;
      id: string;
      name: string;
      plan: {
        cycles: number;
        discount: {
          value: number;
          cycles: number;
        };
        increment: {
          value: number;
          cycles: number;
        };
        interval: number;
        interval_type: string;
        provider: string;
        split_cycles: number;
        trial_days: number;
      };
      units_per_sale: number;
      value: number;
    };
  };
  payment_method: string;
  product: {
    id: string;
    marketplace_id: string;
    marketplace_name: string;
    name: string;
    offer: {
      cash_discount: number;
      id: string;
      name: string;
      plan: {
        cycles: number;
        discount: {
          value: number;
          cycles: number;
        };
        increment: {
          value: number;
          cycles: number;
        };
        interval: number;
        interval_type: string;
        provider: string;
        split_cycles: number;
        trial_days: number;
      };
      units_per_sale: number;
      value: number;
    };
  };
  provider: string;
  subscriber: WebhookContact;
  subscription_code: string;
  trial_days: number;
  trial_finished_at: string | null;
  trial_started_at: string | null;
}

export interface WebhookPayload {
  headers: {
    [key: string]: string;
  };
  params: Record<string, any>;
  query: Record<string, any>;
  body: WebhookBody;
  webhookUrl: string;
  executionMode: string;
} 