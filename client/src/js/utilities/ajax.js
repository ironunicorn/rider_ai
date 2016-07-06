/**
 * Finds csrf_token in document.cookie.
 * @returns string value of csrf_token key.
 */
export function getCsrf() {
  let [_, csrf] = document.cookie.split('csrf_token=')
  let [csrfToken, whatever] = csrf.split(';')

  return csrfToken
}
