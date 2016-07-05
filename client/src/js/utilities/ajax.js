export function getCsrf() {
  let [_, csrf] = document.cookie.split('csrf_token=')
  let [csrfToken, whatever] = csrf.split(';')

  return csrfToken
}
