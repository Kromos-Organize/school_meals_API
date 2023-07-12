export type ClientType = {
	user_id: number,
	school_id: number,
	role: string
	admin_client_id?: string
}

export type ClientsType = { 
	[key in string] : ClientType
}