export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/* BIG QUERY
 ===*/
export const GOOGLE_PROJECT_ID = "pfm-mvp"
export const GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\fabio\OneDrive\Documents\Projetos\pluggy-node\example\key.json"

/* PLUGGY BANK
 ===*/
export const PLUGGY_BANK_CONNECTOR = 2
export const PLUGGY_BANK_CREDENTIALS = {
  user: 'user-ok',
  password: 'password-ok',
}

/* NU-BANK
 ===
export const PLUGGY_BANK_CONNECTOR = 212
export const PLUGGY_BANK_CREDENTIALS = {
  cpf: '00889151903',
  password: 'C0X@2020'
}*/