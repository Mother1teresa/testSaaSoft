export type AccountType = 'local' | 'ldap'
export interface Label {
    text: string
}

export interface Account {
    id: number
    labels: Label[]
    type: AccountType
    login: string
    password: string | null
    isValid: boolean
    touched: boolean
}
