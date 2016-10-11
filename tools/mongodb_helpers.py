#!/usr/bin/env python

from pymongo import MongoClient
from collections import namedtuple

DEFAULT_ADDRESS = 'localhost'
DEFAULT_PORT = 27017

DEFAULT_DB = 'aparata_db'
DEFAULT_ODS_COLLECTION = 'open_datasets'
DEFAULT_DATA_COLLECTION = 'open_datasets_data'

RecordTemplate = namedtuple('Record',
                            ['name',
                             'description',
                             'url_csv',
                             'license_id',
                             'license_title',
                             'license_url',
                             'author',
                             'author_email',
                             'maintainer',
                             'maintainer_email',
                             'metadata_created',
                             'metadata_modified'])


LocationRecordMapping = namedtuple('LocationRecordMapping', 'latitude, longitude, district')
ValueRecordMapping = namedtuple('ValueMapping', 'value_description, value')


def connect_mongodb(uri=""):
    if not uri:
        client = MongoClient(DEFAULT_ADDRESS, DEFAULT_PORT)
    else:
        client = MongoClient(uri)

    return client


def get_db(client):
    return client[DEFAULT_DB]

def get_ods_collection(db):
    return db[DEFAULT_ODS_COLLECTION]

def get_data_collection(db):
    return db[DEFAULT_DATA_COLLECTION]


def insert_ods_header(db, recordTemplate, locationRecordMapping, valueRecordMapping, data):
    pass

def insert_dataset(db, recordTemplate, locationRecordMapping, valueRecordMapping, data):
    tmp = recordTemplate._asdict()
    tmp['data'] = []

    for blob in data:
        transformed_blob = {}

        # Transform Location Data
        for target, original in locationRecordMapping._asdict().iteritems():
            value = blob.pop(original, None)
            if value:
                transformed_blob[target] = value

        # Transform Key Value Data
        for target, original in valueRecordMapping._asdict().iteritems():
            value = blob.pop(original, None)
            if value:
                transformed_blob[target] = value

        # Copy remaining values
        transformed_blob.update(blob)
        tmp['data'].append(transformed_blob)

    get_data_collection(db).insert_one(tmp).inserted_id
