import React from 'react';
import { View, Text, Image } from 'react-native';

interface Props {
  size?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  picture?: string;
  placeholderPicture?: any;
  fadeDuration?: number;
  initials?: string;
}

export default class Avatar extends React.PureComponent<Props> {
  constructor (props: Props) {
    super(props);
  }

  render() {
    const avatar = this.props;

    const avatarSize: number      = avatar.size || 60,
          borderRadius: number    = avatarSize / 2,
          fontSize: number        = avatarSize * .38,
          backgroundColor: string = avatar.color || '#ccc';

    const avatarPicture: any = {
      width: avatarSize,
      height: avatarSize,
      overflow: 'hidden',
    };

    const avatarInitials: any = {
      textAlign: 'center',
      zIndex: -1,
      color: '#fff',
      includeFontPadding: false,
      fontSize: fontSize,
      height: avatarSize,
      paddingTop: (avatarSize / 2) - (fontSize / 2) - 1,
    };

    const borderColor: any = (!avatar.borderColor || !avatar.borderWidth) ? null : {
      borderWidth: avatar.borderWidth,
      borderColor: avatar.borderColor,
    }

    if (avatar.picture || avatar.placeholderPicture) {
      return (
        <View
          style={[avatarPicture, { borderRadius, backgroundColor: avatar.color || '#ccc' }]}
        >
          <Image
            style={[avatarPicture, { position: 'absolute', borderRadius }, borderColor]}
            fadeDuration={avatar.fadeDuration || 150}
            resizeMode='cover'
            source={!!avatar.picture ? { uri: avatar.picture } : avatar.placeholderPicture}
          />
          <Text style={avatarInitials}>{ avatar.initials || '' }</Text>
        </View>
      )
    }
    
    else {
      return (
        <View style={[avatarPicture, { borderRadius, backgroundColor }]}>
          <Text style={avatarInitials}>{ avatar.initials || '' }</Text>
        </View>
      )
    }
  }
}
