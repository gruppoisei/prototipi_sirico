import {inject} from '@angular/core'
import {CanActivateFn} from '@angular/router'
import {AuthenticationService} from '../service/authentication.service'

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenticationService)
  if (!auth.getIsAuthenticated) {
    return false
  }
  return true
}
