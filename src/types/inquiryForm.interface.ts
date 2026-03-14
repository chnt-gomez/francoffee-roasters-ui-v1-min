import type { ServiceType } from "./serviceType.interface"

export interface InquiryForm {
  name: string
  email: string
  phone: string
  serviceType: ServiceType
  message: string
  preferredDate: string
}