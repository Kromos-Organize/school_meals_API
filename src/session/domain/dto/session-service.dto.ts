export interface ISessionCreateDTO {
    user_id: number;
    device_name: string;
    ip: string;
}

export interface ISessionCreationAttrs{
    user_id: number
    device_name: string
    ip: string
    issued_at: Date
    last_usage_at: Date
    logged_out: boolean
    expires_at: Date
}