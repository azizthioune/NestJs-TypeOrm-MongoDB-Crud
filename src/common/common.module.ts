import { DynamicModule, Module } from '@nestjs/common';
import { AbstractService } from './services/abstract.service';

@Module({})
export class CommonModule {
  static forRoot(options: Partial<any>): DynamicModule {
    const providers = [
      {
        provide: AbstractService,
        useValue: AbstractService,
      },
    ];

    return {
      providers: providers,
      exports: providers,
      module: CommonModule,
    };
  }
}
