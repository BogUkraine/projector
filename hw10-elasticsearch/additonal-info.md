```
settings: {
  analysis: {
    filter: {
      autocomplete_filter: {
        type: 'edge_ngram',
        min_gram: 1,
        max_gram: 10
      }
    },
    analyzer: {
      autocomplete: {
        type: 'custom',
        tokenizer: 'standard',
        filter: [
          'lowercase',
          'autocomplete_filter'
        ]
      }
    }
  }
}
```

analysis: Defines custom text analysis configurations. </br>
filter: Contains custom filters that transform text during the indexing process.</br>
autocomplete_filter: A custom filter of type edge_ngram.</br>
type: 'edge_ngram': This filter type creates tokens by sliding a window of specified lengths (from min_gram to max_gram) over the input text. It's designed to support autocomplete by generating multiple substrings of a word.</br>
min_gram: 1: The minimum length of the generated n-grams. For example, with a min_gram of 1, the word "example" would produce tokens like "e", "ex", "exa", etc.</br>
max_gram: 10: The maximum length of the generated n-grams. It ensures that n-grams are generated up to 10 characters in length. For example, with "autocomplete" and max_gram of 10, tokens up to "autocomplete" are generated.</br>
analyzer: Defines custom analyzers for text fields.</br>

autocomplete: A custom analyzer designed to facilitate autocomplete functionality.</br>
type: 'custom': Indicates a custom analyzer is being defined.</br>
tokenizer: 'standard': The tokenizer breaks text into words. The standard tokenizer splits text into tokens based on common word boundaries (like spaces and punctuation).</br>
filter: Specifies the list of filters to apply to tokens produced by the tokenizer.</br>
lowercase: Converts all characters to lowercase to ensure that searches are case-insensitive.</br>
autocomplete_filter: The custom edge n-gram filter defined earlier is applied to the tokens to produce substrings that will be used for autocomplete.</br>
