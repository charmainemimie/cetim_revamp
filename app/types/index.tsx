export interface Equipment {
    id: string
    inventoryNo: string
    barcode: string
    designation: string
    acquisitionDate: string
    status: "Bon" | "En panne" | "Réformé"
    office: string
    brand: string
    processor: string
    hardDrive: string
    ram: string
    os: string
    direction: string
    serialNumber: string
  }
  
  export interface User {
    id: string
    name: string
    email: string
    role: "admin" | "user"
  }
  
  export interface ChatMessage {
    role: "user" | "assistant"
    content: string
  }