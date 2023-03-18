/**
 * Expects an input attribute in the request body with a number as a value,
 * multiplies that value with 2 and returns the result in multiplied
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.multiply = (req, res) => {
  const input = req.body.input;

  // Check if input exists and is a number
  if (typeof input !== 'number') {
    return res.status(400).send('Invalid input');
  }

  const output = { multiplied: 2 * input };
  res.json(output);
};
