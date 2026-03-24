// check if middleware assigned res.locals
export const authenticated = (handler) => {
  return (req, res, next) => {
    try {
      if (!res.locals || !res.locals.user) {
        return next(new Error("Missing authenticated user in res.locals"));
      }
      handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};