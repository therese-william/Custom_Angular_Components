import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
if (!Array.prototype.sortBy) {
  Array.prototype.sortBy = function (s, d="ASC") {
    return this.sort((a, b) => {
      if ((d == "ASC" && a[s] < b[s]) || (d == "DESC" && a[s] > b[s]))
        return -1;
      if ((d == "ASC" && a[s] > b[s]) || (d == "DESC" && a[s] < b[s]))
        return 1;
      return 0;
    });
  }
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
