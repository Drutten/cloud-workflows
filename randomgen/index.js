/**
 * Returns random number between 1 and 100 inclusive
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.randomgen = (req, res) => {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  const output = { random: randomNum };
  res.json(output);
};
