import fs from 'fs/promises';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packagePath = path.join(__dirname, './package.json');
const appPath = path.join(__dirname, './defaultApp.js');
const appTesterPath = path.join(__dirname, './defaultAppTester.js');

export default async function (packageName, packageDesc, gitHubUrl) {
  const shortenedUrl = gitHubUrl.replace('.git', '');
  const bugsUrl = shortenedUrl + '/issues';
  const homepageUrl = shortenedUrl + '#readme';
  try {
    const packageFile = await fs.readFile(packagePath, 'utf8');
    const packageData = JSON.parse(packageFile);
    packageData.name = packageName;
    packageData.description = packageDesc;
    packageData.repository.url = gitHubUrl;
    packageData.bugs.url = bugsUrl;
    packageData.homepage = homepageUrl;
    packageData.dependencies = {};

    const appFile = await fs.readFile(appPath, 'utf8');
    const appTesterFile = await fs.readFile(appTesterPath, 'utf8');

    await fs.writeFile(
      `../${packageName}/package.json`,
      JSON.stringify(packageData, null, 2),
      'utf8'
    );

    await fs.writeFile(`../${packageName}/app.js`, appFile, 'utf8');
    await fs.writeFile(`../${packageName}/appTester.js`, appTesterFile, 'utf8');

    console.log(
      'Package_Configurer has successfully configured the package.json file for:'
    );
    console.log(packageName);
  } catch (error) {
    console.error('Package_Configurer encountered an error:');
    console.error(error);
  }
}
