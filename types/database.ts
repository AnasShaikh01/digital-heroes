export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'user' | 'subscriber' | 'admin';
export type BillingInterval = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type ContributionStatus = 'pending' | 'processed' | 'failed';
export type DonationStatus = 'pending' | 'succeeded' | 'failed';
export type DrawType = 'monthly_standard' | 'special_event';
export type DrawStatus = 'draft' | 'simulated' | 'published' | 'completed';
export type WinnerVerificationStatus = 'pending' | 'verified' | 'rejected';
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_audit_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'admin_audit_logs_admin_id_fkey';
            columns: ['admin_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      plans: {
        Row: {
          id: string;
          name: string;
          billing_interval: BillingInterval;
          price_amount: number;
          currency: string;
          discount_percentage: number;
          prize_pool_percentage: number;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          billing_interval: BillingInterval;
          price_amount: number;
          currency?: string;
          discount_percentage?: number;
          prize_pool_percentage: number;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          billing_interval?: BillingInterval;
          price_amount?: number;
          currency?: string;
          discount_percentage?: number;
          prize_pool_percentage?: number;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          status: SubscriptionStatus;
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status: SubscriptionStatus;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: SubscriptionStatus;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_plan_id_fkey';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          }
        ];
      };
      subscription_payments: {
        Row: {
          id: string;
          subscription_id: string;
          stripe_invoice_id: string | null;
          amount: number;
          currency: string;
          status: PaymentStatus;
          period_start: string | null;
          period_end: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subscription_id: string;
          stripe_invoice_id?: string | null;
          amount: number;
          currency?: string;
          status?: PaymentStatus;
          period_start?: string | null;
          period_end?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string;
          stripe_invoice_id?: string | null;
          amount?: number;
          currency?: string;
          status?: PaymentStatus;
          period_start?: string | null;
          period_end?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscription_payments_subscription_id_fkey';
            columns: ['subscription_id'];
            isOneToOne: false;
            referencedRelation: 'subscriptions';
            referencedColumns: ['id'];
          }
        ];
      };
      charities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          website_url: string | null;
          image_urls: string[];
          upcoming_events: Json;
          active: boolean;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          website_url?: string | null;
          image_urls?: string[];
          upcoming_events?: Json;
          active?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          website_url?: string | null;
          image_urls?: string[];
          upcoming_events?: Json;
          active?: boolean;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_charity_preferences: {
        Row: {
          id: string;
          user_id: string;
          charity_id: string;
          contribution_percentage: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          charity_id: string;
          contribution_percentage: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          charity_id?: string;
          contribution_percentage?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_charity_preferences_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_charity_preferences_charity_id_fkey';
            columns: ['charity_id'];
            isOneToOne: false;
            referencedRelation: 'charities';
            referencedColumns: ['id'];
          }
        ];
      };
      charity_contributions: {
        Row: {
          id: string;
          user_id: string;
          charity_id: string;
          subscription_payment_id: string | null;
          contribution_percentage: number;
          amount: number;
          currency: string;
          status: ContributionStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          charity_id: string;
          subscription_payment_id?: string | null;
          contribution_percentage: number;
          amount: number;
          currency?: string;
          status?: ContributionStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          charity_id?: string;
          subscription_payment_id?: string | null;
          contribution_percentage?: number;
          amount?: number;
          currency?: string;
          status?: ContributionStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'charity_contributions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'charity_contributions_charity_id_fkey';
            columns: ['charity_id'];
            isOneToOne: false;
            referencedRelation: 'charities';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'charity_contributions_subscription_payment_id_fkey';
            columns: ['subscription_payment_id'];
            isOneToOne: false;
            referencedRelation: 'subscription_payments';
            referencedColumns: ['id'];
          }
        ];
      };
      donations: {
        Row: {
          id: string;
          user_id: string | null;
          charity_id: string;
          stripe_payment_intent_id: string | null;
          amount: number;
          currency: string;
          status: DonationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          charity_id: string;
          stripe_payment_intent_id?: string | null;
          amount: number;
          currency?: string;
          status?: DonationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          charity_id?: string;
          stripe_payment_intent_id?: string | null;
          amount?: number;
          currency?: string;
          status?: DonationStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'donations_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'donations_charity_id_fkey';
            columns: ['charity_id'];
            isOneToOne: false;
            referencedRelation: 'charities';
            referencedColumns: ['id'];
          }
        ];
      };
      scores: {
        Row: {
          id: string;
          user_id: string;
          score: number;
          score_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          score: number;
          score_date: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          score?: number;
          score_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'scores_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      draws: {
        Row: {
          id: string;
          draw_month: string;
          draw_type: DrawType;
          status: DrawStatus;
          cutoff_at: string;
          winning_numbers: number[] | null;
          prize_pool_percentage: number;
          total_prize_pool: number;
          jackpot_rollover_amount: number;
          algorithm_version: string | null;
          simulated_at: string | null;
          published_at: string | null;
          created_by: string | null;
          published_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          draw_month: string;
          draw_type: DrawType;
          status?: DrawStatus;
          cutoff_at: string;
          winning_numbers?: number[] | null;
          prize_pool_percentage: number;
          total_prize_pool?: number;
          jackpot_rollover_amount?: number;
          algorithm_version?: string | null;
          simulated_at?: string | null;
          published_at?: string | null;
          created_by?: string | null;
          published_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          draw_month?: string;
          draw_type?: DrawType;
          status?: DrawStatus;
          cutoff_at?: string;
          winning_numbers?: number[] | null;
          prize_pool_percentage?: number;
          total_prize_pool?: number;
          jackpot_rollover_amount?: number;
          algorithm_version?: string | null;
          simulated_at?: string | null;
          published_at?: string | null;
          created_by?: string | null;
          published_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'draws_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'draws_published_by_fkey';
            columns: ['published_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      draw_entries: {
        Row: {
          id: string;
          draw_id: string;
          user_id: string;
          score_values: number[];
          score_dates: string[];
          is_eligible: boolean;
          match_count: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          draw_id: string;
          user_id: string;
          score_values?: number[];
          score_dates?: string[];
          is_eligible?: boolean;
          match_count?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          draw_id?: string;
          user_id?: string;
          score_values?: number[];
          score_dates?: string[];
          is_eligible?: boolean;
          match_count?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'draw_entries_draw_id_fkey';
            columns: ['draw_id'];
            isOneToOne: false;
            referencedRelation: 'draws';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'draw_entries_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      draw_prize_tiers: {
        Row: {
          id: string;
          draw_id: string;
          match_count: number;
          pool_share_percentage: number;
          allocated_amount: number;
          rollover: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          draw_id: string;
          match_count: number;
          pool_share_percentage: number;
          allocated_amount?: number;
          rollover?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          draw_id?: string;
          match_count?: number;
          pool_share_percentage?: number;
          allocated_amount?: number;
          rollover?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'draw_prize_tiers_draw_id_fkey';
            columns: ['draw_id'];
            isOneToOne: false;
            referencedRelation: 'draws';
            referencedColumns: ['id'];
          }
        ];
      };
      winners: {
        Row: {
          id: string;
          draw_id: string;
          draw_entry_id: string;
          prize_tier_id: string;
          user_id: string;
          match_count: number;
          prize_amount: number;
          verification_status: WinnerVerificationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          draw_id: string;
          draw_entry_id: string;
          prize_tier_id: string;
          user_id: string;
          match_count: number;
          prize_amount: number;
          verification_status?: WinnerVerificationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          draw_id?: string;
          draw_entry_id?: string;
          prize_tier_id?: string;
          user_id?: string;
          match_count?: number;
          prize_amount?: number;
          verification_status?: WinnerVerificationStatus;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'winners_draw_id_fkey';
            columns: ['draw_id'];
            isOneToOne: false;
            referencedRelation: 'draws';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'winners_draw_entry_id_fkey';
            columns: ['draw_entry_id'];
            isOneToOne: false;
            referencedRelation: 'draw_entries';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'winners_prize_tier_id_fkey';
            columns: ['prize_tier_id'];
            isOneToOne: false;
            referencedRelation: 'draw_prize_tiers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'winners_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      winner_proofs: {
        Row: {
          id: string;
          winner_id: string;
          storage_path: string;
          submitted_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
          rejection_reason: string | null;
        };
        Insert: {
          id?: string;
          winner_id: string;
          storage_path: string;
          submitted_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          rejection_reason?: string | null;
        };
        Update: {
          id?: string;
          winner_id?: string;
          storage_path?: string;
          submitted_at?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          rejection_reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'winner_proofs_winner_id_fkey';
            columns: ['winner_id'];
            isOneToOne: true;
            referencedRelation: 'winners';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'winner_proofs_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      payouts: {
        Row: {
          id: string;
          winner_id: string;
          amount: number;
          currency: string;
          status: PayoutStatus;
          paid_at: string | null;
          payment_reference: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          winner_id: string;
          amount: number;
          currency?: string;
          status?: PayoutStatus;
          paid_at?: string | null;
          payment_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          winner_id?: string;
          amount?: number;
          currency?: string;
          status?: PayoutStatus;
          paid_at?: string | null;
          payment_reference?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payouts_winner_id_fkey';
            columns: ['winner_id'];
            isOneToOne: true;
            referencedRelation: 'winners';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      billing_interval: BillingInterval;
      subscription_status: SubscriptionStatus;
      payment_status: PaymentStatus;
      contribution_status: ContributionStatus;
      donation_status: DonationStatus;
      draw_type: DrawType;
      draw_status: DrawStatus;
      winner_verification_status: WinnerVerificationStatus;
      payout_status: PayoutStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}