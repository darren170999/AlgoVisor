export const cppDefault: string = `
#include <iostream>
#include <string>   // C++ string class
#include <cstring>  // C-string
using namespace std;
 
int main() {
   char cstr[] = "hello world!";
   cout<<cstr;
}
`;