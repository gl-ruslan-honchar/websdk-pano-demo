const token = 'eyJ1c2VyX2lkIjoic29tZS10ZXN0LXVzZXIiLCJ0aW1lc3RhbXAiOjE1NTk3MTkzNjh9';
const signature = 'uy2Pe0lBYBCjQ8s4ClWx4AUPmOESqXDcWflXBpdYcYeLPRsRpoILeUgOjdmyiI8fr46T4Rj2+VcEnhNaKQZXOcz1Hv7omrWdWvJFdTDjy4Txrs4PKcvPT3C46Nyid4NxyGpZf3F+VEHuexmVofr9EXDhW81WrbPBwbkae1NPz+ZYwtdHCXkEsh+XDlFQ1ajyPA8INfoUF86SXCyQardF87ooKLgHsO7kDyAUslY7zXvygVbhZQT0gs1dwyiyXoFYbGoK91sFu/jiYpuFubfLLe33yDrVnB1udsQzg043flt7a+I0U6Y/LEst5qwtc9B77fx4mJJciRX0gT3MEKlCS49vbH7ydFbIKo29aQNqGd5kYKje30bAOa9d83wi/gWxpYF93MAtgG/oLq7j9DWa4042NEtfzqqTfK31Mv+O2i7I6cMzb2YzRGZXLkzQRLz/62Oxb1u6VhwteYSem4xO2Twtj2f+emNbRYL1lk5jyseI+EGY6uXSp0UPi5QbZ9gP6wmcqKDuD6P2gzE4CW4kthc15u2HA2yHOiDErbOtSeUdHZLEXMqWFah2iHh9jkfA3IwoEfl+9Hb4RZgqSBbQT2R+mRI3amWz2ukfgSSyT98Fygb+/Bbld2/A2abRF3BzmzU0DWw1DCxuAiZ/XcgUeY7QgAouTwckHbuHRYpP7iY='

export const createPixellotPlayer = (element, options = {}) => {
  const PixellotWebSDK = window['pixellot-web-sdk'];

  PixellotWebSDK.Auth.setSession(token, signature);

  const player = PixellotWebSDK.Player(element, options);

  player.setTitle('Pano POC Demo');

  return player;
};
