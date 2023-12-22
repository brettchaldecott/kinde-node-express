import { validateQueryParams } from '../auth';
import { getInternalClient } from '../setup';

/**
 * Function uses internal SDK to return registration url with the `is_create_org`
 * query param set to true.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<URL>} required createOrg authorization URL
 */
export const createOrg = async (req, res, next) => {
  const error = validateQueryParams(req.query);
  if (error !== null) {
    res.status(400);
    return next(error);
  }

  const { createOrg } = getInternalClient();
  const createOrgURL = await createOrg(req, req.query);
  res.redirect(createOrgURL);
};
