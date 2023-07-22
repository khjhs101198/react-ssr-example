import path from 'path';
import fs from 'fs';

// Function to recursively search for files that match the pattern
export function findFilesMatchingPattern(directory, pattern, fileList = []) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const filePath = path.join(directory, file);

        if (fs.statSync(filePath).isDirectory()) {
            // Recursively search subdirectories
            findFilesMatchingPattern(filePath, pattern, fileList);
        } else if (pattern.test(filePath)) {
            // If the file path matches the pattern, add it to the list
            fileList.push(file);
        }
    });

    return fileList;
}