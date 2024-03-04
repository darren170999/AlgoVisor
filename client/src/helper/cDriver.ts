export const cDriver : string = `
int main() {
    int input[] = 
    int *output = NULL;
    int outputLength = 0;
    int n = sizeof(input) / sizeof(input[0]);
    for(int i = 0; i < n; i++){
        outputLength++;
        output = realloc(output, outputLength * sizeof(int));
        if (output == NULL) {
            // Failed
            printf("Memory allocation failed!\n");
            return 1;
        }
        output[outputLength - 1] = solution(input, n); // Call solution with the correct arguments
    }
    for (int i = 0; i < outputLength; i++) {
        printf("%d ", output[i]);
    }
    free(output);
    return 0;
}
`;