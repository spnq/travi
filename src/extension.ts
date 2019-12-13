import * as vscode from 'vscode';
import { SPLITED_TEXT, TRIGGER_CHARACTERS, COMMAND } from "./const";
import { PUNCTUATION_REGEXP, COMMAND_WITH_NUMBER_REGEXP } from "./regexps";

/**
 * Extracts number of words after a keyword
 * @param document vscode document
 * @param position position of cursor
 */
const extractNumber = (document: vscode.TextDocument, position: vscode.Position): number => {

    /**
     * Deletes the keyword (COMMAND) from the last match on the line to avoid dealing with multiple 
     * occurances of the keyword
     * @param matchGroup result of string.match with given regexp
     */
    const replaceCommandFromLastGroup = (matchGroup: RegExpMatchArray): number => {
        const lastGroup = matchGroup[matchGroup.length-1];

        if (lastGroup === COMMAND) return 0;
        return parseInt(lastGroup.replace(COMMAND, ''));
    };

    const line: string = document.lineAt(position).text;
    const matchGroup: RegExpMatchArray | null = line.match(COMMAND_WITH_NUMBER_REGEXP);
    return matchGroup !== null ? replaceCommandFromLastGroup(matchGroup) : 0;
};

/**
 * Removes punctuation from the end of given text 
 * @param text string to be cut
 */
const removeLastPunctuationMark = (text: string): string => {
    return PUNCTUATION_REGEXP.test(text[text.length-1]) ? text.slice(0,-1) : text;
};

/**
 * Generates text with given number of words
 * @param wordCount number of words to generate
 */
const generateText = (wordCount: number): string => {
    if (wordCount === 0) return SPLITED_TEXT.join(' ');

    /**
     * Recursively generates an array with length granter than given word count
     * @param wordCount number of words splited array must be greater than
     * @param splitedArray array to be recursively added to itself
     */
    const textRepeater = (wordCount: number, splitedArray: string[]): string[] => {
        const doubledArray = splitedArray.concat(splitedArray);
        return wordCount > doubledArray.length ? textRepeater(wordCount, doubledArray) : doubledArray;
    };

    const localArray: string[] = SPLITED_TEXT.length < wordCount ? textRepeater(wordCount, SPLITED_TEXT) : SPLITED_TEXT;
    const rawText: string = localArray.slice(0, wordCount).join(' ');
    return removeLastPunctuationMark(rawText);
};

export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider('*', {
		
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			const completionItem = new vscode.CompletionItem(COMMAND);
            const wordCount: number = extractNumber(document, position);
            const generatedText: string = generateText(wordCount);

            completionItem.label = `${COMMAND}${wordCount || ''}`;
            completionItem.insertText = generatedText;

            return [completionItem];
		}
	}, ...TRIGGER_CHARACTERS);
	context.subscriptions.push(provider);
} 