# AWS Polly Philippine TTS Setup Guide (FREE TIER)

## Overview
Your Hiligaynon vocabulary app now uses **AWS Polly with Lea voice** for authentic Filipino pronunciation. AWS offers a generous **free tier** perfect for educational apps!

## 🆓 AWS Free Tier Benefits
- **5 million characters per month** FREE for standard voices
- **1 million characters per month** FREE for neural voices
- **12 months free** for new AWS accounts
- **Always free tier** continues after 12 months with reduced limits

## 🚀 Quick Setup Steps

### 1. Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Click "Create an AWS Account"
3. Complete registration (requires credit card for verification but won't be charged for free tier usage)
4. Verify your account

### 2. Create IAM User for Polly Access
1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click "Users" → "Add user"
3. User name: `hiligaynon-tts-user`
4. Access type: ✅ **Programmatic access**
5. Click "Next: Permissions"

### 3. Set Permissions
1. Select "Attach existing policies directly"
2. Search for and select: ✅ **AmazonPollyReadOnlyAccess**
3. Click "Next" → "Next" → "Create user"
4. **IMPORTANT**: Copy your credentials:
   - Access Key ID
   - Secret Access Key

### 4. Configure Your App
Edit `src/config/speechConfig.js`:
```javascript
export const SPEECH_CONFIG = {
  AWS_ACCESS_KEY_ID: 'YOUR_ACCESS_KEY_ID_HERE',
  AWS_SECRET_ACCESS_KEY: 'YOUR_SECRET_ACCESS_KEY_HERE',
  AWS_REGION: 'us-east-1',
  VOICE_ID: 'Joanna' // US English female voice - clear pronunciation
}
```

### 5. Test Your Setup
```bash
npm run dev
```
Click any pronunciation button (🔊) and you should hear Lea's authentic Filipino voice!

## 🎤 Voice Features

### Joanna Voice (US English)
- **Language**: US English (en-US)
- **Gender**: Female  
- **Quality**: Standard engine (high quality)
- **Accent**: Clear American English pronunciation
- **Perfect for**: Language learning with clear articulation

### Speech Quality
- **High fidelity**: 22.05 kHz sample rate
- **Natural cadence**: Optimized for Filipino speech patterns
- **Clear pronunciation**: Perfect for language education
- **MP3 format**: Efficient and compatible

## 💰 Cost Management

### Free Tier Limits (Monthly)
- **Standard voices**: 5,000,000 characters FREE
- **Neural voices**: 1,000,000 characters FREE
- **Typical usage**: ~50-100 characters per word
- **Estimated capacity**: 10,000-20,000 words per month FREE

### Usage Optimization
- **Audio caching**: Reduces repeated API calls
- **Smart fallback**: Uses browser TTS when limits reached
- **Efficient requests**: Only processes unique text

### Monitoring Usage
1. Go to [AWS Billing Console](https://console.aws.amazon.com/billing/)
2. Check "Free Tier" section
3. Monitor Polly usage
4. Set up billing alerts if needed

## 🛠️ Technical Details

### API Configuration (AWS SDK v3)
```javascript
// AWS Polly v3 SynthesizeSpeechCommand parameters
{
  Text: 'Hiligaynon word or sentence',
  OutputFormat: 'mp3',
  VoiceId: 'Joanna',
  LanguageCode: 'en-US',
  Engine: 'standard'
}
```

### Error Handling
- **Automatic fallback** to browser TTS if AWS fails
- **Graceful degradation** when free tier limits reached
- **Smart caching** to minimize API usage
- **Connection timeout** handling

### Security Best Practices
- **IAM user** with minimal required permissions
- **No root account** access keys
- **Region-specific** configuration
- **Client-side** credential management

## 🔧 Troubleshooting

### Common Issues

#### 1. "AWS credentials not configured"
- Check that your Access Key ID and Secret Access Key are correct
- Ensure no extra spaces in the credentials
- Verify the IAM user has Polly permissions

#### 2. "Access Denied" errors
- Verify IAM user has `AmazonPollyReadOnlyAccess` policy
- Check that the AWS region is correct (`us-east-1`)
- Ensure the IAM user is active

#### 3. "Free tier limit exceeded"
- Check AWS billing console for current usage
- App will automatically fall back to browser TTS
- Usage resets monthly

#### 4. Audio not playing
- Check browser console for error messages
- Verify internet connection
- Test with browser fallback (disable AWS temporarily)

### Debug Mode
Open browser console to see detailed logs:
```
AWS Polly v3 configured successfully with clear pronunciation voices
Loading AWS Polly v3 audio (Joanna)...
AWS Polly v3 audio ready
Generated clear speech with AWS Polly v3 voice: Joanna
Played pronunciation: "kumusta" with AWS Polly v3 voice Joanna
```

## 🎯 Why AWS Polly?

### Advantages
- ✅ **Generous free tier** (5M characters/month)
- ✅ **High-quality neural voices**
- ✅ **Authentic Filipino accent** with Lea voice
- ✅ **Reliable AWS infrastructure**
- ✅ **Global availability**
- ✅ **No daily limits** (only monthly)

### Perfect for Education
- **Cost-effective** for student applications
- **Scalable** as your app grows
- **Professional quality** audio
- **Authentic pronunciation** for language learning

## 📊 Usage Examples

### Typical App Usage
- **Vocabulary words**: ~10-50 characters each
- **Example sentences**: ~100-200 characters each
- **Daily usage**: ~500-1000 characters per active user
- **Monthly capacity**: 1000+ active users within free tier

### Character Count Examples
- "Kumusta" = 7 characters
- "Maayong aga" = 11 characters  
- "Pila ang bayad padulong sa airport?" = 35 characters

## 🔒 Security Notes
- Never commit AWS credentials to version control
- Use environment variables in production
- Regularly rotate access keys
- Monitor usage through AWS CloudTrail

## 📞 Support
- **AWS Documentation**: [AWS Polly Documentation](https://docs.aws.amazon.com/polly/)
- **Filipino Voice Samples**: [AWS Voice Samples](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)
- **AWS Free Tier**: [AWS Free Tier Details](https://aws.amazon.com/free/)
- **Billing Support**: [AWS Billing Console](https://console.aws.amazon.com/billing/)

Your Hiligaynon vocabulary app now has professional-grade Filipino pronunciation at zero cost! 🎉