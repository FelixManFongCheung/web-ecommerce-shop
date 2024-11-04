import * as tf from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model: mobilenet.MobileNet;

export const loadModel = async () => {
  if (!model) {
    model = await mobilenet.load();
  }
};

export const classifyImage = async (imageBuffer: Buffer) => {
  await loadModel();
  const tensor = tf.node.decodeImage(imageBuffer).resizeNearestNeighbor([224, 224]);
  const predictions = await model.classify(tensor as tf.Tensor3D);
  tensor.dispose();
  return predictions;
};