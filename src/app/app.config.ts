import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideAnimations } from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { provideToastr } from 'ngx-toastr';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]),),
    importProvidersFrom(NgxSkeletonLoaderModule.forRoot({animation:'pulse', theme: {
      'background-color': '#20283e'
    }})),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr({
      timeOut: 1000,
      positionClass: 'toast-bottom-center',
      toastComponent: CustomToastComponent
      })
  ]
};
