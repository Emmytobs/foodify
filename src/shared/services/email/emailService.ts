
export interface EmailOptions {
    from: string,
    to: string,
    subject: string,
    body: string,
    html?: string
}
export abstract class EmailService {
    abstract sendMail(options: EmailOptions): any
}