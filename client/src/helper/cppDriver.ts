export const cppDriver : string = `
  output = []
  ls
  for i in ls:
  # function should return output of format specified
    output.append(main(i))
  for o in output:
    print(o)
`;