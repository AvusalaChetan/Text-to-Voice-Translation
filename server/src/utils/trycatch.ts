import type {Request, Response, NextFunction} from "express";

const TryCatch = (passedFn:any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await passedFn(req, res, next);
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

  export {TryCatch}



