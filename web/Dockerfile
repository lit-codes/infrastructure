FROM litcodes/rmp-base

COPY . .

RUN npm run frontend # build the frontend application
RUN npm install # Install backend dependencies

CMD ["index.js"]

