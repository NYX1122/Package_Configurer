import fs from 'fs/promises';

export default async function (packageName, packageDesc, gitHubUrl) {
  const shortenedUrl = gitHubUrl.replace('.git', '');
  const bugsUrl = shortenedUrl + '/issues';
  const homepageUrl = shortenedUrl + '#readme';
  try {
    const packageFile = await fs.readFile('./package.json', 'utf8');
    const packageData = JSON.parse(packageFile);
    packageData.name = packageName;
    packageData.description = packageDesc;
    packageData.repository.url = gitHubUrl;
    packageData.bugs.url = bugsUrl;
    packageData.homepage = homepageUrl;
    packageData.dependencies = {};

    await fs.writeFile(
      `../${packageName}/package.json`,
      JSON.stringify(packageData, null, 2),
      'utf8'
    );

    console.log(
      'Package_Configurer has successfully configured the package.json file for:'
    );
    console.log(packageName);
  } catch (error) {
    console.error('Package_Configurer encountered an error:');
    console.error(error);
  }
}
