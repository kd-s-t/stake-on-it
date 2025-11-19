import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

class AWSQ {
  private client: BedrockRuntimeClient

  constructor() {
    this.client = new BedrockRuntimeClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      }
    })
  }

  async query(prompt: string): Promise<string> {
    try {
      const command = new InvokeModelCommand({
        modelId: 'amazon.titan-text-express-v1',
        body: JSON.stringify({
          inputText: prompt,
          textGenerationConfig: {
            maxTokenCount: 512,
            temperature: 0.7
          }
        }),
        contentType: 'application/json'
      })

      const response = await this.client.send(command)
      const result = JSON.parse(new TextDecoder().decode(response.body))
      return result.results[0].outputText
    } catch (error) {
      console.error('AWS Q Error:', error)
      return 'Error querying AWS Q'
    }
  }
}

export default new AWSQ()