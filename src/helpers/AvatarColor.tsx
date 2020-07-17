import CRC32 from 'crc-32';

const AvatarColor = (str: string = '') => {
  var materialColors = [
    '#FF3B30', // red
    '#FF9500', // orange
    '#8E8E93', // gray
    '#4CD964', // green
    '#5AC8FA', // tealBlue
    '#007AFF', // blue
    '#5856D6', // purple
  ];

  var checksum = CRC32.str(str || 'random' + Math.random() * 100000);

  if (checksum < 0) checksum = (checksum * -1);

  var colorIndex = (checksum % materialColors.length);

  return materialColors[colorIndex];
}

export default AvatarColor;
