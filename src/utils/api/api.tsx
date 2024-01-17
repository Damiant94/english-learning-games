import axios from 'axios';
import words from '../js/words';
import Definitions from '../interfaces/Definitions';

const randomWordUrl = 'https://random-word-rest-api.vercel.app/word';
const definitionsUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

export const getRandomWordApi = async (): Promise<string> => {
  try {
    const response = await axios.get(randomWordUrl);
    console.log("word taken from api");
    return response.data[0];
  } catch (error) {
    console.log(error);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    console.log("word taken from frontend");
    return randomWord;
  }
}

export const get3RandomWordsApi = async (): Promise<[] | any> => {
  try {
    const response = await axios.get(`${randomWordUrl}s?number=3`);
    console.log("3 words taken from api");
    return response.data;
  } catch (error) {
    console.log(error);
    const randomWords = words.sort(() => 0.5 - Math.random()).slice(0, 3);
    console.log("3 words taken from frontend");
    return randomWords;
  }
}

export const getDefinitionApi = async (word: string): Promise<string | any> => {
  try {
    const response = await axios.get(definitionsUrl + word);
    return response.data[0].meanings[0].definitions[0].definition;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const getDefinitionsApi = async (word: string): Promise<any> => {
  const messageError = "Sorry, couldn't find a definition";
  try {
    const response = await axios.get(definitionsUrl + word);
    const definitions: Definitions[] = response.data[0].meanings
      .reduce((acc: Definitions[], meaning: any) => {
        return acc.concat(meaning.definitions)
      }, [])
      .map((element: Definitions) => element.definition);
      return definitions;
  } catch (error) {
    console.log(error);
    return [messageError];
  }
}