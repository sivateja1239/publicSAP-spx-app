/**
 * List of spacex launch model.
 */
export interface CardDetails {
  flight_number?: number;
  mission_name?: string;
  mission_id?: string[];
  launch_year?: string;
  launch_success?: boolean;
  rocket?: {
    first_stage: { cores: Stage[] };
    second_stage?: { cores: Stage[] };
  };
  links?: { mission_patch_small: string };
}

/**
 * Rocket Landing success/failure status.
 */
export interface Stage {
  land_success: boolean;
  landing_intent?: boolean;
  landing_type?: string;
  landing_vehicle?: any;
  block?: number;
  payload: Array<any>;
}

/**
 * Filter panel's possible value model.
 */
export interface Filters {
  isSelected: boolean;
  year?: number;
  value?: any;
}
