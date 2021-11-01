import { HttpException, ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';

export class PageFeedbackException extends HttpException {
  page: string

  constructor(message: string, status: number, page: string = 'pages/login') {
    super(message, status);
    this.page = page;
  }
}

@Catch(PageFeedbackException)
export class PageFeedbackExceptionFilter implements ExceptionFilter {
  catch(exception: PageFeedbackException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.render(exception.page, { error: true, message: exception.message, status })
  }
}