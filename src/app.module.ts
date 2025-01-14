import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeSlotsModule } from './time-slots/time-slots.module';

@Module({
  imports: [TimeSlotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
